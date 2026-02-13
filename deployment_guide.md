# Deployment Guide: AiUnlocked-Bolt (Dokploy)

Since you are using **Dokploy**, deployment becomes much simpler! Dokploy can directly deploy your `docker-compose.yml` file.

## Prerequisites
-   A **Dokploy** instance installed on your VPS.
-   Access to your **GitHub** repository (push your code there).
-   A project created in Dokploy.

## 1. Push Code to GitHub
Ensure you have pushed your latest code (including `Dockerfile`, `Dockerfile.backend`, and `docker-compose.yml`) to a private or public repository.

## 2. Deploy in Dokploy (Compose Method)
The easiest way to deploy this full stack is using Dokploy's **Compose** feature.

1.  **Open Dokploy Dashboard**.
2.  Go to your Project -> **Compose** tab.
3.  Click **"Create Compose"**.
    -   **Name**: `aiunlocked-bolt`
    -   **Repository**: Select your GitHub repo.
    -   **Branch**: `main` (or your branch).
    -   **Path**: `docker-compose.yml` (default is `./`).
4.  **Envrionment Variables**:
    -   Copy the content of your local `.env` file into the Environment Variables section in Dokploy.
    -   **Crucial Update**: Change `VITE_API_URL` to point to your **production domain**.
        ```env
        VITE_API_URL=https://your-app-domain.com/api
        VITE_N8N_GENERATE_WEBHOOK=https://n8n.bawhlab.uk/webhook/generate-content-app
        ```

## 3. Configure Networking (Important!)
By default, Docker Compose services are internal. You need to tell Dokploy which service to expose to the internet via Traefik.

1.  **Go to the "Domains" tab** for your Compose application.
2.  **Add Domain**:
    -   **Service**: `app` (This is your frontend/nginx service name from `docker-compose.yml`).
    -   **Port**: `80` (Internal port of the container, NOT the exposed host port 3000).
    -   **Domain**: `your-app-domain.com` (e.g., `app.bawhlab.uk`).
    -   **Path**: `/`
    -   **HTTPS**: Enable HTTPS (LetsEncrypt).

3.  **Deploy**.
    -   Click the **"Deploy"** button.
    -   View logs to ensure both `app` (frontend) and `backend` services start correctly.

## 4. Updates to `docker-compose.yml` (Optional/Recommended)
Dokploy handles networking via Traefik, so you might want to remove the specific host port binding (`3000:80`) in `docker-compose.yml` to avoid conflicts, or just let Dokploy handle the routing regardless.

The most critical part is ensuring the **Frontend** (`app`) proxies API requests to the **Backend** (`backend`) internally, which is handled by your `nginx.conf`:

```nginx
location /api {
    proxy_pass http://backend:3001;
    ...
}
```
This configuration works perfectly inside Dokploy's internal network because services can reach each other by service name (`backend`).

## 5. Verify
Once deployed:
1.  Visit `https://your-app-domain.com`.
2.  The frontend should load.
3.  The API requests to `/api/listings` should work (proxied through Nginx to the backend).
