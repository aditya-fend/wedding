import { getTemplateCategories } from "@/lib/services/template";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await getTemplateCategories();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
