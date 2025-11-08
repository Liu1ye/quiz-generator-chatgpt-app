# 阶段 1：安装依赖
FROM node:18-alpine AS deps
WORKDIR /app

# 安装 pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# 安装构建依赖（有些包如 sharp、canvas、pdf-lib 需要）
RUN apk add --no-cache libc6-compat python3 make g++

# 拷贝依赖文件
COPY package.json pnpm-lock.yaml* ./

# 安装依赖（只生产环境可用可用 --frozen-lockfile）
RUN pnpm install --frozen-lockfile

# 阶段 2：构建应用
FROM node:18-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm run build

# 阶段 3：运行阶段
FROM node:18-alpine AS runner
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

COPY --from=builder /app ./

CMD ["pnpm", "run", "start"]