FROM node:18.13.0


# Set working directory
WORKDIR /var/www

RUN mkdir -p /usr/share/man/man1

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    default-jre \
    libonig-dev \
    libzip-dev

# Install puppeteer and headless Chrome for pdf generation
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - 
RUN apt-get -f install
RUN apt-get update && apt-get install -y \
    nodejs \
    gconf-service \
    libasound2 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 libgcc1 \
    libgconf-2-4 \
    libgdk-pixbuf2.0-0 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    ca-certificates \
    fonts-liberation \
    # libappindicator1 \
    libnss3 \
    lsb-release \
    xdg-utils \
    wget \
    libgbm-dev


# RUN npm install --global --unsafe-perm puppeteer
# RUN chmod -R o+rx /usr/lib/node_modules/puppeteer/.local-chromium

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
#RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
#RUN docker-php-ext-configure gd --with-freetype=/usr/include/ --with-jpeg=/usr/include/
#RUN docker-php-ext-install gd

# Extend timeout
# RUN echo "request_terminate_timeout = 300" >> /usr/local/etc/php-fpm.d/docker.conf

# Install composer
# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Add user for laravel application
RUN groupadd -g 1001 www
RUN useradd -u 1001 -ms /bin/bash -g www www

# Copy existing application directory contents
COPY . /var/www

# Copy existing application directory permissions
COPY --chown=www:www . /var/www

# Change current user to www
USER www

# Expose port 3000 and start php-fpm server
EXPOSE 3000
CMD ["npm run start"]
