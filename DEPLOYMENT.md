# 🚀 Survive Uni Deployment Guide

This guide covers the final steps to move Survive Uni from your local machine to a production server on **Hostinger**.

## 1. Pushing to GitHub
First, you need to store your code in a repository. This makes deployment and updates much easier.

1.  **Create a New Repo**: Go to [github.com/new](https://github.com/new) and create a public or private repository named `survive-uni`.
2.  **Run these commands** in your terminal inside the project folder:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "chore: production ready 2026-2027 build"

# Link to your GitHub (Replace 'yourusername' with your actual username)
git remote add origin https://github.com/yourusername/survive-uni.git

# Push the code
git branch -M master
git push -u origin master
```

---

## 2. Deploying on Hostinger (VPS)
If you have a **VPS plan** (recommended for Next.js), follow these steps:

1.  **Login via SSH**: Use PuTTY or Terminal to connect to your VPS.
2.  **Install Node.js**:
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
    ```
3.  **Clone the Repo**:
    ```bash
    git clone https://github.com/yourusername/survive-uni.git
    cd survive-uni
    ```
4.  **Install Dependencies & Build**:
    ```bash
    npm install
    npm run build
    ```
5.  **Setup PM2 (Process Manager)**:
    ```bash
    sudo npm install -g pm2
    pm2 start npm --name "survive-uni" -- start
    pm2 save
    pm2 startup
    ```

---

## 3. Google Search Console & AdSense
Before you start ranking, you must verify your site ownership.

### Google Search Console
1.  Go to [Google Search Console](https://search.google.com/search-console/about).
2.  Add your domain `surviveuni.online`.
3.  Choose **HTML Tag** verification.
4.  Copy the `content` code (e.g., `google-site-verification=XYZ...`).
5.  Open `app/layout.tsx` and find the line:
    `google-site-verification: "YOUR_GOOGLE_VERIFICATION_CODE_HERE"`
6.  **Replace it** with your code and push to GitHub.

### Google AdSense
1.  Apply at [google.com/adsense](https://www.google.com/adsense/start/).
2.  Once you get your **Publisher ID** (e.g., `pub-123456789`), update these two files:
    -   `ads.txt`: Change `pub-0000000000000000` to your ID.
    -   `app/layout.tsx`: Find the script with `pub-YOUR_PUBLISHER_ID` and update it.

---

## 4. Final Checklist
- [ ] Domain points to Hostinger IP (A Records).
- [ ] SSL Certificate (Let's Encrypt) is active.
- [ ] Sitemap submitted to Search Console (`/sitemap.xml`).
- [ ] `ads.txt` is accessible at `https://surviveuni.online/ads.txt`.

**Congratulations!** Your global EdTech platform is now live.
