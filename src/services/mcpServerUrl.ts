const DEFAULT_MCP_PATH = '/mcp';

const getRuntimeOrigin = (): string => {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }

  return 'http://localhost:3000';
};

const normalizePath = (path: string): string => {
  if (!path) {
    return DEFAULT_MCP_PATH;
  }

  return path.startsWith('/') ? path : `/${path}`;
};

export interface McpServerUrlOptions {
  baseUrl?: string;
  path?: string;
}

/**
 * สร้าง URL ของ MCP server โดยรองรับทั้ง absolute URL และ path
 *
 * ลำดับการเลือก base URL:
 * 1) options.baseUrl
 * 2) VITE_MCP_SERVER_BASE_URL
 * 3) window.location.origin
 */
export const createMcpServerUrl = (options: McpServerUrlOptions = {}): string => {
  const envBaseUrl = import.meta.env.VITE_MCP_SERVER_BASE_URL as string | undefined;
  const rawBaseUrl = options.baseUrl ?? envBaseUrl ?? getRuntimeOrigin();
  const path = normalizePath(options.path ?? DEFAULT_MCP_PATH);

  const resolvedBase = new URL(rawBaseUrl, getRuntimeOrigin());
  return new URL(path, resolvedBase).toString();
};
