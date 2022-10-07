# About
GlobalStore is a free open-source software application. It’s intended to be a self-organized store application, where any one on the web can publish his or her service or product. The application is self-organized in the sense that the community or the users (vendors & customers) are playing a big role in the administration. 

Any registered user can publish, review, and report products/services. However, reports weights vary according to users credibility. If a user with credibility equals to one has reported a product service, review, or even an account, the reported item would have an 1 RW (report weight) increment in its total reports weight value. When the total reports weight for any item exceeds a certain limit (that the community specify every two weeks), the item (the account) will be removed (banned).

In default, all users have 1 CR (credibility). For each successful product/service the account CR increments by one. A product/service is considered successful if it has more than ten positive reviews (also, that metric is specified by the community every two weeks).


# Development

## Back-End Development

The backend is developed using [Express](https://expressjs.com/) and [PosrgreSQL](https://node-postgres.com/). However, the overall system could be implemented using any liberary/framework adhering the architecture being illustrated in the [docs](/backend/README.md).

## Front-End Development

The frontend is only implemented with javascript/typescript, though React.js & JSX is extensively used in drawing the UI. In order to give the architecture more portability, so to speak, over using specific UI library, React is used through a specific component "UIBuilder" which is completely unknown to other components and can easly be adapted to any library rather than React. [frontend docs](/frontend/README.md)
