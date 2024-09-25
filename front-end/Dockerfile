# שלב 1: בניית אפליקציית React
FROM node:16-alpine as build

WORKDIR /app

# העתקת קבצי הפרויקט לתוך הקונטיינר
COPY package*.json ./
RUN npm install
COPY . .

# בניית האפליקציה
RUN npm run build

# שלב 2: הגדרת קונטיינר להנחה
FROM nginx:alpine

# העתקת קבצי הבנייה לאנגלית של Nginx
COPY --from=build /app/build /usr/share/nginx/html

# חשיפת הפורט שבו Nginx רץ
EXPOSE 80

# הפעלת Nginx
CMD ["nginx", "-g", "daemon off;"]
