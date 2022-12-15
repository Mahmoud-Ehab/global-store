# About

GlobalStore is a free open-source software application. It’s intended to be a self-organized store application, where any one on the web can publish his or her service or product. The application is self-organized in the sense that the community or the users (vendors & customers) are playing a big role in the administration. 

Any registered user can publish, review, and report products/services. However, reports weights vary according to users credibility. If a user with a credibility equals to 1 has reported a product service, review, or even an account, the reported item would have an 1 RW (report weight) increment in its total reports weight value. When the total reports weight for any item exceeds a certain limit (that the community specify every two weeks), the item (the account) will be removed (banned).

In default, all users have 1 CR (credibility). For each successful product/service the account CR increments by one. A product/service is considered successful if it has more than ten positive reviews (also, that metric is specified by the community every two weeks).


# Development

## Back-End Development

The backend is developed using [Express](https://expressjs.com/) and [PosrgreSQL](https://node-postgres.com/). However, the overall system could be implemented using any liberary/framework adhering the architecture being illustrated in the [docs](/backend/README.md).

## Front-End Development

Despite the fact that ReactJS/JSX is used ultimately in drawing the UI, the frontend is developed using just javascript/typescript. In order to make the frontend portable rather than using a specific UI library, ReactJS is used through an abstract component "UIBuilder"; which defines a comprehensive and an abstract design that can be implemented by any UI library. [frontend docs](/frontend/README.md)
