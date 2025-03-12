The content was writen in UTF-8 language: traditional chinese.

# 光碟中檔案解析
資料夾目錄

- GamebookClientBuild
- GamebookWebBuild
- LearnInGame
- MangoData
- Web
  - app
  - server

GamebookClientBuild資料夾包含的檔案為Unity打包好的程式，可以直接執行透過LearnInGame.exe。
**GamebookWebBuild：**
	為React專案，打包後的成品。
**LearnInGame：**
Unity的專案資料夾，自行新增的檔案位於Assets中，其中程式碼的部分位於Script資料夾中，須至以下網址下載
https://github.com/FatBoy001/Gamebook。
**MangoData：**
裡面的Json檔案本次專案所使用的測試資料。
**Web：**
資料夾分為app與server，app為前端，server為後端。
app：為React專案，自行撰寫程式碼位於src資料夾中。
server：node.js與express.js所構成的後端程式，主體為檔案名稱index.js，models資料夾用途為處理資料。

將分為原始程式碼以及打包後的程式做不同的安裝步驟，須先完成打包完成之程式的流程。

# 主要流程（開啟已打包完成之程式）

第一步：實體主機與環境架設
第二步：MangoDB建立
第三步：註冊網域
第四步：MCV架設(後端)與前端網站架設

## 詳細解析

### 第一步

​	需要架設一個實體的主機，其ip位置必須為固定ip，安裝unix like系統，本次專題安裝Ubuntu 22.04.1 server
作業系統，設定其IP，本次專題IP位置為140.127.xxx.xxx。作業系統的安裝需要映像檔以及燒錄工具Etcher，完成後安裝置機器中，設定帳號及密碼。

```bash
# 以下操作於Linux terminal下輸入指令：	
# 輸入sudo vi /etc/dhcpcd.conf來修改設定：
# interface eth0
# static ip_address=140.127.xxx.xxx/24
# static routers=140.127.zzz.zzz
# static domain_name_servers=140.127.yyy.yyy 8.8.8.8
# 輸入sudo reboot重啟，建立SSH連線並非必須，若有需要請自行開啟。
# 輸入sudo apt-get install -y nodejs安裝，完成後輸入node -v確認是否安裝完畢。
# 輸入sudo apt-get install npm安裝，完成後輸入npm -v確認是否安裝完畢。
# 按照順序輸入刪除apache2：
sudo systemctl stop apache2
sudo systemctl disable apache2
sudo apt remove apache2
sudo apt autoremove
# 按照順序輸入安裝NginX：
sudo apt clean all && sudo apt update && sudo apt dist-upgrade
sudo rm -rf /var/www/html
sudo apt install nginx
sudo apt install ufw
sudo ufw enable
sudo ufw allow "Nginx Full"
sudo rm /etc/nginx/sites-available/default
sudo rm /etc/nginx/sites-enabled/default
```

### 第二步

- 至https://www.mongodb.com/home註冊帳號。

- 登入後進入database點擊Create，建立任一種皆沒有關係，本次專題使用Share中的Google cloud region選擇Taiwan，Cluster Name為Gamebook。

- 點擊Network Access並點擊add ip address於Access List Entry後輸入欲連線之ip位置，本次專題設定為0.0.0.0，為所有位置皆可行。

- 點擊Database Access並點擊add new database user，於Password Authentication下輸入用戶名稱與密碼。

- 完成後進入Database點擊剛建立好的Database，點擊connect，點擊connect your application，選擇Node.js與4.1 or later，並儲存下方連接，其格式為：
  	mongodb+srv://A1083365:<password>@gamebook.zmyoydr.mongodb.net/?retryWrites=true&w=majority
  	其中A1083365:<password>，冒號前面為Database Access中所建立的用戶名稱後方為密碼，後續將用於MCV程式連接。

- 點擊Database並點擊上面所建立的database名稱為Gamebook，點擊Collections，下方頁面中游標指向Gamebook，點擊旁邊的加號以新增Collection。
- 上面步驟重複8次，分別新增chinesegames、englishgames、mathgames、sciencegames、students、teacherclasses、teachers。
- 安裝MongoDB compass，於光碟中資料夾名稱開發工具，檔案名稱為mongodb-compass-1.34.2-win32-x64。
- 點擊connect，點擊connect using MongoDB Compass，複製Copy the connection string, then open MongoDB Compass.
- 下方連接，其格式為mongodb+srv://A1083365:<password>@gamebook.zmyoydr.mongodb.net/test。
  	其中A1083365:<password>，冒號前面為Database Access中所建立的用戶名稱後方為密碼。
- 開啟MongoDB compass，將上面複製的連結貼入New Connection中的URL，點擊connect。
- 將光碟中資料夾為MongoDB data逐一將資料倒入Collection中，檔案名稱對應Collection名稱。
- 點擊相對應的資料以students舉例，點擊MongoDB compass中左邊的students。
- 點擊ADD DATA，點擊Import file，選擇JSON，Select File選擇相對應的json檔，於光碟中MongoData資料夾中的students.json檔案，完成點擊import。

### 第三步

- 至freenom(網址：https://www.freenom.com/zu/index.html?lang=zu)申請域名gamebook.ga選擇後，需註冊帳號，註冊完成之後購買。

- 至cloudflare(網址：https://www.cloudflare.com/zh-tw/)註冊帳號，登入後於Websites點擊Add a Site，於Enter your site下輸入網域名稱gamebook.ga，必須為freenom所申請的域名，或其他網站。

  (以其他方法皆可，本專案最終網域名稱為gamebook.ga)

- 本專案選擇免費版本，隨後點擊繼續，點擊確認，將幫助你設定DNS，至下放4.Cloudflare名稱伺服器，複製下方的連結前往freenom，點擊Management Tools，點擊Nameservers，點擊Use custom nameservers(enter below)，輸入複製的連結於下方，4.Cloudflare名稱伺服器下會有兩個連接，兩個都需要貼入下方，完成後點擊Change Nameservers。

- 回到cloudflare用戶主頁重新整理，會看到gamebook.ga待處理，等數分鐘後會變為有效，點入DNS，移動至下方管理gamebook.ga的DNS，點擊添加紀錄。

- 類型為A名稱為@IPv4地址為140.127.xxx.xxx，再新增一個類型為A名稱為wwwIPv4地址為140.127.xxx.xxx後保存

### 第四步

- 於主機Linux terminal下輸入指令：

```bash
sudo vim /etc/nginx/sites-available/140.127.xxx.xxx
# 進入vim後輸入以下設定：
# server{
#     server_name gamebook.ga www.gamebook.ga;
#     location / {
#             root /var/www/140.127.xxx.xxx;
#             index index.html index.htm;
#             try_files $uri.html $uri $uri/ /index.html;
#     }
#     location /nodeAPI {
#             proxy_pass http://140.127.xxx.xxx:8800;
#             proxy_http_version 1.1;
#             proxy_set_header Upgrade $http_upgrade;
#             proxy_set_header Connection 'upgrade';
#             proxy_set_header Host $host;
#             proxy_cache_bypass $http_upgrade;
#     }
# }
# 儲存後退出

# 於主機Linux terminal下輸入指令：
sudo apt install certbot python3-certbot-nginx
sudo ufw status
sudo certbot --nginx -d gamebook.ga -d www.gamebook.ga
sudo systemctl status certbot.timer
sudo mkdir 140.127.xxx.xxx

# 並將資料夾GamebookWeb中的檔案全數放入/var/www/140.127.xxx.xxx目錄下。

# 於主機Linux terminal下輸入指令：
sudo npm i -g pm2
sudo pm2 start /var/www/140.127.xxx.xxx/nodeAPI/index.js
```

- 完成以上四步應該可以於瀏覽器中輸入https://gamebook.ga便可以看見登入畫面，帳號密碼為，a1083365@mail.nuk.edu.tw、123，學生遊戲端可以透過打開Gamebook資料夾中的LearnInGame.exe，遊戲端帳號密碼為，bb@gmail.com、yza0ev，若是不行則是因為資料庫連接過期，又或者註冊網域過期，可以透過原始程式碼修改後重新打包。

# 主要流程（原始程式碼）

第一步：安裝Node.js、VS code、Unity Hub
第二步：開啟Unity程式碼
第三步：開啟Web

## 詳細解析

### 第一步

- 所有需要安裝的資料於光碟中開發工具的資料夾，需特別注意的是VS Code在同意下一步之後，必須開起所有其他選項。Unity Hub的主體位於開發工具資料夾中的Unity Hub資料夾，其中Unity Hub.exe為執行檔，開啟後須開啟一個有效授權，並安裝Unity，本次專案所使用版本為2020.3.23f1。

## 第二步
- 開啟Unity Hub點擊開啟，打開光碟中LearnInGame的資料夾，若需要修改連線問題，可以在C#檔案中
  Script資料夾下的URL檔。

## 第三步
- 前往/Web/app，右鍵Open VS Code Project，可於App.js檔案中24行改變位置，若是網域有改變。

- 於VS Code中的Terminal中輸入npm install，完成後輸入npm start，便可查看網頁情況，若需要打包則輸入

  ```bash
  npm run build
  ```