<img src="https://broadsign.com/broadsign_outline.svg" alt="Broadsign Logo" width="200" />

---

**[Broadsign.com](https://broadsign.com)** website, running on **[GatsbyJS](https://www.gatsbyjs.org)**.

_Last updated : 2025-03-13_

---

# Table of Contents

-   [Prerequisites](#prerequisites)
-   [Getting Started](#getting-started)
    -   [Clone Repo and Install](#clone-repo-and-install)
-   [Development](#development)
    -   [Start Gatsby](#start-gatsby)
-   [Hosting](#hosting)
-   [Deployment](#deployment)
    -   [Branches](#branches)
-   [Authors](#authors)
    -   [Contributors](#contributors)
-   [Links](#links)
    -   [Wordpress](#wordpress)

---

# Prerequisites

-   [**Node**](https://nodejs.org/) : Node v20.18.0 is recommended.
-   [**Yarn**](https://yarnpkg.com/) : Yarn v3.3.0 is recommended, and preferred over npm or pnpm.

# Getting Started

## Clone Repo and Install

Clone the repo in the directory of your choice and then move to this new directory.

```
git clone https://github.com/broadsign-marketing/website.git
cd website
yarn
```

Set your Git client to the **staging** branch. **We do not develop on Master**.

It is advised to create a new branch, from the current state of Staging, as a starting point for any new page, component, feature etc.

# Development

## Start Gatsby

Run in the root of the project :

```
yarn dev
```

Starting the server should take a few minutes. It'll be longer the first time because GatsbyJS has to fetch a few thousand images from Wordpress. Eventually you'll be able to open the site at https://localhost:8000.

# Hosting

We are hosted on [Netlify](https://app.netlify.com/sites/broadsign/overview).

We have different installs :

-   **[Production](https://broadsign.com/)**
-   **[Staging](https://staging.broadsign.com/)**
-   **[Webdev](https://webdev.broadsign.com/)** : Development install.
-   **[Webwip](https://webwip.broadsign.com/)** : Development install.
-   **[Webtest](https://webtest.broadsign.com/)** : Test install.

# Deployment

Builds on Netlify take :

-   2 to 4 minutes in most cases ;
-   About 15 minutes if the install isn't new but something has been changed in the configs ;
-   Up to 30 minutes if the install is absolutely fresh or the cache has been cleared.

## Branches

Create branches as needed, based on staging, to develop changes. Merge that branch to staging for final approval by the team. Once approved, [create a pull request from staging to master](https://github.com/broadsign-marketing/website/compare/master...staging).

# Authors

### [Kevin Gagnon](https://www.linkedin.com/in/kevin-gagnon-aa485972/)

Front-end developer at Broadsign

### [Valentin Lacheré](https://www.linkedin.com/in/valentin-lacher%C3%A9/)

Front-end developer at Broadsign (2019-2020)

### [Charbel Chahine](https://www.linkedin.com/in/charbelchahine/)

Prototype author, Front-end developer intern at Broadsign (2018)

## Contributors

### [Michel Maroun](https://www.linkedin.com/in/michel-maroun-b564a5126/)

Front-end developer intern at Broadsign (2018)

# Links

## Wordpress

-   **[Production Admin Panel](https://writers.broadsign.com/wp-admin/)**
-   **[Staging Admin Panel](http://broadsignposts.staging.wpengine.com/wp-admin/)**
