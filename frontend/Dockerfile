FROM nginx:alpine

# Xóa cấu hình mặc định của Nginx
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy cấu hình Nginx Reverse Proxy
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy toàn bộ giao diện HTML, CSS, JS vào Nginx
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
