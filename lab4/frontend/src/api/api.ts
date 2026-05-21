import { GroupedSkinRow, PaginatedSkins, QuizQuestion, Skin } from "./types";

const API_URL = "http://127.0.0.1:5000/api";

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

export type SkinQuery = {
  page?: number;
  perPage?: number;
  search?: string;
  rarity?: string;
  weaponType?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export function getSkins(params: SkinQuery = {}) {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(params.page || 1));
  searchParams.set("per_page", String(params.perPage || 10));
  if (params.search) searchParams.set("search", params.search);
  if (params.rarity) searchParams.set("rarity", params.rarity);
  if (params.weaponType) searchParams.set("weaponType", params.weaponType);
  if (params.sortBy) searchParams.set("sort_by", params.sortBy);
  if (params.sortOrder) searchParams.set("sort_order", params.sortOrder);

  return request<PaginatedSkins>(`/skins?${searchParams.toString()}`);
}

export function getSkin(id: number) {
  return request<Skin>(`/skins/${id}`);
}

export function createSkin(skin: Omit<Skin, "id">) {
  return request<Skin>("/skins", {
    method: "POST",
    body: JSON.stringify(skin),
  });
}

export function updateSkin(id: number, skin: Partial<Skin>) {
  return request<Skin>(`/skins/${id}`, {
    method: "PUT",
    body: JSON.stringify(skin),
  });
}

export function deleteSkin(id: number) {
  return request<{ message: string }>(`/skins/${id}`, {
    method: "DELETE",
  });
}

export function getGroupedSkins(groupBy: string) {
  return request<GroupedSkinRow[]>(`/skins/groups?group_by=${groupBy}`);
}

export function getQuiz() {
  return request<QuizQuestion[]>("/quiz");
}
