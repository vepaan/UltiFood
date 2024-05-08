export interface RequestInit {
    method?: string;
    headers?: HeadersInit;
    body?: BodyInit | null;
    redirect?: "error" | "follow" | "manual";
}