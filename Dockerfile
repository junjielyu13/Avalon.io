FROM node:18.13.0


# Set working directory
WORKDIR /usr/src/app

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



# Extend timeout
# RUN echo "request_terminate_timeout = 300" >> /usr/local/etc/php-fpm.d/docker.conf

# Add user for laravel application
RUN groupadd -g 1001 www
RUN useradd -u 1001 -ms /bin/bash -g www www


COPY --chown=www:www package*.json ./
COPY --chown=www:www . .


RUN npm install -g npm@latest
RUN npm install
RUN npm ci


# Change current user to www
USER www

# Creates a "dist" folder with the production build
# RUN npm run build

# Expose port 3000
EXPOSE 3000

# Creates a "dist" folder with the production build
#RUN npm run build

# CMD [ "npm run start:dev" ]
