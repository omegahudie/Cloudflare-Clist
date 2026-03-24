import { createRequestHandler } from "react-router";

declare module "react-router" {
  export interface AppLoadContext {
    cloudflare: {
      env: Env;
      ctx: ExecutionContext;
    };
  }
}

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE
);

export default {
  async fetch(request, env, ctx) {
    return requestHandler(request, {
      cloudflare: { env, ctx },
    });
  },
} satisfies ExportedHandler<Env>;

// 定义环境变量类型
export interface Env {
  DB: D1Database;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD: string;
  SITE_TITLE: string;
  SITE_ANNOUNCEMENT: string;
  CHUNK_SIZE_MB: string;
  WEBDAV_ENABLED: string;
  WEBDAV_USERNAME: string;
  WEBDAV_PASSWORD: string;
  BACKGROUND_IMAGE_URL: string;  // 新增
}

// 在 API 中暴露给前端
app.get('/api/config', async (c) => {
  const env = c.env as Env;
  return c.json({
    siteTitle: env.SITE_TITLE,
    siteAnnouncement: env.SITE_ANNOUNCEMENT,
    backgroundImageUrl: env.BACKGROUND_IMAGE_URL,  // 暴露背景图 URL
    webdavEnabled: env.WEBDAV_ENABLED === 'true',
  });
});