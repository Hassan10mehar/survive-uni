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

## 2. Automated Deployment (GitHub Actions)
We have set up an automated pipeline. Every time you push to GitHub, the site updates on Hostinger.

### Setting up GitHub Secrets
Go to your GitHub Repo → **Settings > Secrets and variables > Actions** and add:
- `SSH_HOST`: `82.29.87.65`
- `SSH_PORT`: `65002`
- `SSH_USER`: `u961276882`
- `SSH_PASSWORD`: (Your SSH Password)

### How to Deploy
Just push your code:
```powershell
git add .
git commit -m "Deploying to production"
git push origin master
```
The GitHub Action will handle the rest!

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
