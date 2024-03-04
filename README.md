<h1 align="center">welcome to Find-Me-Issues 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/open-devs/fastify-typescript-generator/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained-yes-blue.svg" />
  </a>
  <a href="https://github.com/version0chiro/Find-Me-Issues/blob/main/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/version0chiro/Find-Me-Issues" />
  </a>
</p>  

## 🏠 [homepage](https://find-me-issues.herokuapp.com/)

> A React.js based web-app to find repositories containing 'good first issues' for open source contribution.

## 🔥 Tech Stacks
<p>
<img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
<img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
<img alt="Material UI" src="https://img.shields.io/badge/materialui-%230081CB.svg?style=for-the-badge&logo=material-ui&logoColor=white"/>
<img alt="GitHub" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"/>
</p>

## 💡 Inspiration

The most painful thing for programmers who are new to open-source is *finding* beginner friendly projects to contribute.
This issue will be resolved by **Find-Me-Issues**, with a simple and easy to use interface, people will be able to filter the repositories with the type of language they want to work with, number of stars the repository has, number of issues the repository currently has open and much more!

## 🛠 usage

### setting up back-end & front-end
```console
$ git clone https://github.com/version0chiro/Find-Me-Issues.git

$ npm i

$ npm run start // this script is for backend

$ npm run build // this script is for frontend
```

### 📸 screenshot
![demo](./assets/demo1.png)

## 🤝 Contribution Guidelines

Contributions, issues and feature requests are welcome! Guidelines can be found [here](https://github.com/version0chiro/Find-Me-Issues/blob/main/CONTRIBUTING.md).

Feel free to check issues page [here](https://github.com/version0chiro/Find-Me-Issues/issues).

## 🙌 Contributors
<a href="https://github.com/version0chiro/Find-Me-Issues/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=version0chiro/Find-Me-Issues" />
</a>

## Trouble Shooting
If you encounter problems while installing npm, follow these guidelines to help resolve common problems: 

1. Verify your node.js installation
Make sure you have node.js installed in your system. Check your node version in your command line with this command: 

```node -v```
If the command outputs a version number, then you have node installed in your system. 

2. Clear npm cache
Sometimes issues can occur due to a corrupted npm cache. To clear the cache, run the following command:
```npm cache clean --force```

3. Consider Installing NVM if npm is not working properly. 
Run this script in your terminal
```curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.0/install.sh -o install_nvm.sh```

4. Check Proxy Settings:
If you are behind a proxy, ensure that your proxy settings are correctly configured for npm. You can set the proxy using the following commands:
```npm config set proxy http://<proxy_host>:<proxy_port>```
```npm config set https-proxy http://<proxy_host>:<proxy_port>```
Replace <proxy_host> and <proxy_port> with the appropriate values for your proxy.

5. Disable Antivirus or Firewall:
Sometimes, antivirus or firewall software can interfere with the npm installation. Temporarily disable your antivirus or firewall and try the npm installation again.

6.  Retry Installation:
If none of the above steps resolve the issue, try retrying the npm installation after some time. It's possible that the issue is temporary and could be resolved on its own.

## ✨ Show your support

Give a ⭐️ if this project helped you!