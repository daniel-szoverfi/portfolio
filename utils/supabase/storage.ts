import { SupabaseClient } from "@supabase/supabase-js";

const BUCKET = "Test bucket 2"; // Replace with your actual bucket name

/**
 * Returns the public CDN URL for a publicly accessible storage object.
 * Use this when your bucket's RLS policy allows public reads.
 */
export function getPublicImageUrl(
	supabase: SupabaseClient,
	path: string,
): string {
	const {
		data: { publicUrl },
	} = supabase.storage.from(BUCKET).getPublicUrl(path);

	return publicUrl;
}

/**
 * Creates a time-limited signed URL for a private storage object.
 * Use this when your bucket is private and requires authenticated access.
 *
 * @param expiresIn - Expiry in seconds (default: 1 hour)
 */
export async function getSignedImageUrl(
	supabase: SupabaseClient,
	path: string,
	expiresIn = 3600,
): Promise<string | null> {
	const { data, error } = await supabase.storage
		.from(BUCKET)
		.createSignedUrl(path, expiresIn);

	if (error) {
		console.error(`[storage] Failed to sign URL for "${path}":`, error.message);
		return null;
	}

	return data.signedUrl;
}
