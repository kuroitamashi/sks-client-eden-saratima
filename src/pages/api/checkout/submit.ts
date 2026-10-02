import type { APIRoute } from 'astro';
import {
  calculateCertifiedPricing,
  createCodOrder,
  getDefaultShippingZones,
  getShippingZone,
} from '@sks/checkout/index.js';
import type { CartItemInput, ServerCatalogItem, DiscountRule } from '@sks/checkout/index.js';
import { listProducts } from '../../../lib/products.js';
import { getTheme } from '../../../lib/theme.js';

export const prerender = false;

// Codes promos démo / boutique
const STORE_DISCOUNT_RULES: DiscountRule[] = [
  {
    code: 'EDEN10',
    type: 'percentage',
    value: 10,
    isActive: true,
  },
  {
    code: 'BIENVENUE5000',
    type: 'fixed',
    value: 5000,
    isActive: true,
    minOrderAmount: 25000,
  },
];

export const POST: APIRoute = async ({ request, redirect }) => {
  try {
    const formData = await request.formData();

    const firstName = String(formData.get('firstName') || '').trim();
    const lastName = String(formData.get('lastName') || '').trim();
    const phone = String(formData.get('phone') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const shippingZoneId = String(formData.get('shippingZoneId') || 'dakar_ville').trim();
    const address = String(formData.get('address') || '').trim();
    const deliveryNotes = String(formData.get('deliveryNotes') || '').trim();
    const paymentMethod = String(formData.get('paymentMethod') || 'cod').trim() as 'cod' | 'paydunya';
    const discountCode = String(formData.get('discountCode') || '').trim();
    const cartJson = String(formData.get('cartJson') || '[]').trim();

    const rawCart = JSON.parse(cartJson);
    if (!Array.isArray(rawCart) || rawCart.length === 0) {
      return new Response(JSON.stringify({ error: 'Le panier est vide' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Récupération du catalogue serveur officiel certifié
    const produits = await listProducts();
    const catalog: ServerCatalogItem[] = produits.map((p: any) => ({
      productId: p.id,
      variantId: p.id,
      name: p.name,
      variantName: p.format || undefined,
      imageUrl: p.images?.[0] || undefined,
      price: p.price,
      inStock: p.inStock ?? true,
      availableQuantity: p.stock ?? 999,
    }));

    const items: CartItemInput[] = rawCart.map((item: any) => ({
      productId: item.id,
      variantId: item.id,
      quantity: Number(item.qty) || 1,
    }));

    // Recalcul certifié anti-fraude côté serveur
    const { pricing, validatedItems } = calculateCertifiedPricing({
      items,
      catalog,
      shippingZoneId,
      discountCode: discountCode || undefined,
      discountRules: STORE_DISCOUNT_RULES,
      shippingZones: getDefaultShippingZones(),
    });

    const theme = await getTheme();
    const zone = getShippingZone(shippingZoneId) || getDefaultShippingZones()[0];

    // Création de la commande selon le mode choisi
    if (paymentMethod === 'cod') {
      const order = createCodOrder({
        storeId: 'eden-saratima',
        storeName: theme.identity.name,
        supportWhatsApp: theme.identity.whatsapp || '+221773893537',
        formData: {
          firstName,
          lastName,
          phone,
          email: email || undefined,
          shippingZoneId,
          address,
          deliveryNotes: deliveryNotes || undefined,
          paymentMethod: 'cod',
          discountCode: discountCode || undefined,
        },
        validatedItems,
        pricing,
        shippingZoneName: zone.name,
      });

      // Encodage de la commande pour la page de confirmation
      const orderToken = Buffer.from(JSON.stringify(order)).toString('base64url');
      return redirect(`/checkout/confirmation?order=${orderToken}`, 303);
    }

    // Si PayDunya : pour la boutique de démo sans clés API live, on crée la commande avec redirection sécurisée
    return new Response(JSON.stringify({ error: 'Mode PayDunya en cours de finalisation' }), {
      status: 501,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Erreur checkout submit:', err);
    return new Response(JSON.stringify({ error: err.message || 'Erreur lors du traitement de la commande' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
