import { z } from "zod";
import sanitizeHtml from "sanitize-html";

// Helper function untuk sanitasi string mencegah XSS
const sanitizeString = (val: string) => {
  return sanitizeHtml(val, {
    allowedTags: [], // Tidak mengizinkan tag HTML apapun
    allowedAttributes: {},
  }).trim();
};

const sanitizedStringSchema = z.string().transform(sanitizeString);

export const coupleDetailSchema = z.object({
  nama: sanitizedStringSchema,
  ortu_ayah: sanitizedStringSchema,
  ortu_ibu: sanitizedStringSchema,
  instagram: sanitizedStringSchema.optional(),
  foto: z.string().url().optional().or(z.literal("")),
});

export const eventDetailSchema = z.object({
  tipe: sanitizedStringSchema,
  tanggal: sanitizedStringSchema,
  jam: sanitizedStringSchema,
  lokasi: sanitizedStringSchema,
  alamat_lengkap: sanitizedStringSchema,
  link_maps: z.string().url().optional().or(z.literal("")),
});

export const loveStorySchema = z.object({
  tahun: sanitizedStringSchema,
  cerita: sanitizedStringSchema,
  foto: z.string().url().optional().or(z.literal("")),
});

export const digitalEnvelopeSchema = z.object({
  bank_name: sanitizedStringSchema,
  account_number: sanitizedStringSchema,
  account_holder: sanitizedStringSchema,
  qris_url: z.string().url().optional().or(z.literal("")),
});

export const guestWishEntrySchema = z.object({
  name: sanitizedStringSchema,
  message: sanitizedStringSchema,
});

export const invitationContentSchema = z.object({
  mempelai_pria: coupleDetailSchema,
  mempelai_wanita: coupleDetailSchema,
  acara: z.array(eventDetailSchema),
  love_story: z.array(loveStorySchema).optional().default([]),
  gallery: z.array(z.string().url().or(z.literal(""))).optional().default([]),
  digital_envelope: z.array(digitalEnvelopeSchema).optional().default([]),
  guest_wishes: z.array(guestWishEntrySchema).optional().default([]),
  music_url: z.string().url().optional().or(z.literal("")),
  rsvp_url: z.string().url().optional().or(z.literal("")),
  rsvp_note: sanitizedStringSchema.optional(),
  countdown_date: sanitizedStringSchema.optional(),
  cover_title: sanitizedStringSchema.optional(),
  cover_subtitle: sanitizedStringSchema.optional(),
  closing_message: sanitizedStringSchema.optional(),
  dress_code: sanitizedStringSchema.optional(),
  dress_code_description: sanitizedStringSchema.optional(),
  dress_code_color: sanitizedStringSchema.optional(),
  dress_code_colors: z.array(sanitizedStringSchema).optional().default([]),
  additional_info: sanitizedStringSchema.optional(),
  additional_info_list: z.array(sanitizedStringSchema).optional().default([]),
  hero_image: z.string().url().optional().or(z.literal("")),
  wedding_date: sanitizedStringSchema.optional(),
});
