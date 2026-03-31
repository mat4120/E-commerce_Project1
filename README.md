# About Project
This is my first real project that I picked up after learning about basics of full-stack development.
It is simple E-commerce that uses DataBase(PostgreSQL) to render its content and store orders.
Because it right now uses useState, data is stored per-session. 
EDIT 1:
Just merged update 2.0. Decided to rebuild whole UI to make it more industy standarized. 
!!!! WORKING USER ACCOUNTS 123:123 and abc:abc
Added:
- Full JWT Auth (checked by hardcoded array for now - later it will compare to DB)
- New UI
- Offer of the day (Once per day random ID random product is chosen to be displayed on main page(date based seeding))
- Filtering and Categories in shop page
- Navigation bar and Footer which are globally generated
- Now Cart uses LocalStorage so cart caries between refreshes
- Cart page is now restricted for only authed users (123:123/abc:abc)
# Technologies Used
- React
- Express
- PostGreSQL
- PG-Promise
- Tailwind CSS
- Cloudinary(Image hosting)
- JWT
# Process/What I learned
- Since it's my first bigger project I learned how to structure project directory
- Had to find way to connect to my DB - on Express Wiki I found PG-Promise and started using it
- Learned how to do routing and sending data/functions between route files and main app file
- Also learned quite a bit about flexboxes, grids and tailwind in general
- JWT auth implementation into already exisitng site
# What I am planning on implementing
- Will connect DB to Auth and make register create users in DB 
# Screenshots
Old Version
<details>
  <summary><b>1.0 Version Screenshots (Click to Expand)</b></summary>
  <p align="center">
    <img width="1878" height="931" alt="image" src="https://github.com/user-attachments/assets/d3dc4073-67f3-4ef9-9437-d22fe506c5da" />
    <img width="1864" height="930" alt="image" src="https://github.com/user-attachments/assets/37be9dc8-c802-40ce-8a9f-0089a61a2c34" />
    <img width="1877" height="929" alt="image" src="https://github.com/user-attachments/assets/34c71d33-9a2f-4372-9000-e54472c8e222" />
    <img width="1879" height="933" alt="image" src="https://github.com/user-attachments/assets/5bf950e2-aa84-4222-b91a-49d40ffcfc56" />
    <img width="1918" height="566" alt="image" src="https://github.com/user-attachments/assets/6e28d0ec-4009-4fdf-9629-2ad8882ca83e" />
  </p>
</details>
Version 2.0
<details>
  <summary><b>2.0 Version Screenshots (Click to Expand)</b></summary>
  <p align="center">
    <img width="1870" height="934" alt="image" src="https://github.com/user-attachments/assets/aff30cae-a908-48df-83d4-79aa01fa27f4" />
    <img width="1865" height="931" alt="image" src="https://github.com/user-attachments/assets/83a0f193-a926-4960-b225-8e00aad8ff0f" />
    <img width="1867" height="935" alt="image" src="https://github.com/user-attachments/assets/ff35d33c-8e84-4a79-8475-ed6346fb3ba8" />
    <img width="1866" height="931" alt="image" src="https://github.com/user-attachments/assets/634d8b9c-8e04-45c7-8f04-c7dde35e08b8" />
    <img width="1865" height="937" alt="image" src="https://github.com/user-attachments/assets/3365665f-4732-41fc-83f5-85475500380a" />
    <img width="1863" height="934" alt="image" src="https://github.com/user-attachments/assets/a7d45bc0-a412-4789-9641-5c1ade9990c4" />
    <img width="1864" height="932" alt="image" src="https://github.com/user-attachments/assets/54df1137-74f3-4061-b667-2a97090185e0" />
    <img width="1863" height="933" alt="image" src="https://github.com/user-attachments/assets/3e73e609-d364-4175-a0a0-a671dd928c18" />
    <img width="1877" height="934" alt="image" src="https://github.com/user-attachments/assets/d4ea48c6-7043-4e19-b779-ee30d7c03205" />
    <img width="1870" height="935" alt="image" src="https://github.com/user-attachments/assets/7b3aa738-82bc-45b5-bdd7-8b2843a851a6" />
  </p>
</details>




