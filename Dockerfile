# Use the official PHP image for PHP 8.2 in Dockerhub
FROM php:8.1-fpm

# Install system dependencies
# apt-get để cài đặt các gói và thư viện vào hệ điều hành 
# apt-get update: cập nhật danh sách gói từ các nguồn được cấu hình trong hệ thống.
# apt-get install -y \: Lệnh này cài đặt các gói được liệt kê sau nó
# libpng-dev: Thư viện phát triển cho định dạng hình ảnh PNG.
# libjpeg-dev: Thư viện phát triển cho định dạng hình ảnh JPEG.
# libfreetype6-dev: Thư viện phát triển cho định dạng hình ảnh vector (ví dụ: font).
# zip: Chương trình nén và giải nén dữ liệu.
# unzip: Chương trình giải nén dữ liệu từ file nén.
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo pdo_mysql

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Set the working directory in the container
WORKDIR /var/www/html

# Copy the Laravel application into the container
COPY . .

# Install project dependencies
RUN composer install --no-scripts --no-autoloader

# Expose port 9000 for PHP-FPM
EXPOSE 9000

# Start PHP-FPM
CMD ["php-fpm"]