# Using nginx as a reverse proxy to test CORS issues

## `nginx` Setup instructions (mac):

 * install nginx: `brew install nginx`
 * run nginx with command: `nginx`
 * stop nginx with command: `nginx -s stop`
 * test if a port is bound to nginx with command: `lsof -i:8080`
 * write the following contents to file: `/usr/local/etc/nginx/nginx.conf`

```
worker_processes  1;
events { worker_connections  1024; }
http {
  include mime.types;
  default_type application/octet-stream;
  server_names_hash_bucket_size 64;
  sendfile on;
  keepalive_timeout 65;
  server {
    listen 3080;
    server_name host1.com;
    location / {
      proxy_pass http://localhost:3081;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
  }
  server {
    listen 3080;
    server_name host2.com;
    location / {
      proxy_pass http://localhost:3082;
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
    }
  }
}
```

 * add the following contents to file `/etc/hosts`
```
127.0.0.1   host1.com
127.0.0.1   host2.com
```
