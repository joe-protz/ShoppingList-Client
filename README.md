# Web-Based Shopping List

## Important Links

- [Deployed Client](https://joe-protz.github.io/ShoppingList-Client/)
- [Deployed Heroku App](https://shopping-list-10994.herokuapp.com/)
- [API-Repo](https://github.com/joe-protz/ShoppingList-API)
- [GitHub](https://joe-protz.github.io/)
- [Portfolio](https://joe-protz.github.io/#)
- [LinkedIn](https://www.linkedin.com/in/joe-protz/)

## Planning Story

I began with user stories, whiteboarding with a friend. We spent an hour or so coming up with ideas that were relatively simple, yet had a huge amount of expandability (for the 4 day sprint we are allowed)

I ended on an app for shopping lists. The idea being, an authorized user can CRUD items onto a web app which persists. However I also planned out stretch goals and a hopeful timeline.

I made sure I had an ERD, Wireframes, and a timeline set, and I set out to follow my plan as closely as possible.

It started with the rails app. I generated my resource, including its reference to the user. This was a mistake as it is my first time making a resouce that is protected, and it really slowed me down. Eventually, I did get it tested using the app Postman.

Once my resource was generated, I set out to make a simple Web SPA that let me login, logout, change password, sign up, and CRUD items into an editable list.

This was way harder than I had anticipated! But a lot of fun. Going into my second project, I found it very hard to just not care about ui, so I found myself not allowing for ugly features that just work. They had to at least 'kind of' pass my visual test. I used bootstrap to help with this.

I started with authentication. Using some forms from my last project as a guide, I didn't copy the, but used them as a basis to improve upon. I am really happy with how it came out. There weren't too many challenges here beyond styling as the methods are almost idential to my Tic Tac Toe client, which can be seen [here](https://github.com/joe-protz/TicTacToe-client).

After this, I set out whiteboarding to come up with a non-clunky way to CRUD list items on an HTML page. Using handlebars helped a lot with this. By far the biggest challenge was 'update', because I wanted to be able to edit either field , quantity or name, and have it update correctly in my API. I used lots of javascript logic and DOM manipulation to allow this, making use of of the parents and children of elements heavily.

After successfully creating an app that handled a one to many resource, I moved on to planning out how to tackle my first stretch goal; multiple lists. I started with a new ERD which showed the migration process of adding in a new lists table. From there, I branched off into new git branches and got to work.

I scaffolded out a new resource, and added what I thought were the necessary relationships and changes. I really struggled with this part. It was easy enough to get the list table connected to users. However, having my items be a 1 to many relationship to my lists, while also still being owned by the user was a real challenge. I didn't understand how to access the items at all and needed to do a lot of research and reach out to instructors for guidance. A few big takeaways were that an item in this case does not belong to a user, it belongs to a list. a User does however have many items, through lists. In addition, controllers and routes needed to be edited to allow new parameters to access the items. I didn't understand URL params until this, so it was a challenge.

After I finally got my API in order, a major rehaul was done to my client. It needed to allow for users to CRUD lists, which dynamically showed the contents. I repurposed the old code quite a bit. I just needed to know which list I was currently in, and the old list-items based code could be altered slightly to work with this list ID. I really enjoyed this and seeing how having modular code can be very useful.

Overall I have enjoyed this project and will be working towards those stretch goals in the following days.

### User Stories

- As a user, I would like to be able to sign up for this application
  - As a user, I would like my email address to perists if I mess up my password so that I do not need to re-type it.
- As a user I would like to be able to sign in to the application
- As a user I would like to be able to sign out of the application
- As a user I would like to be able to change my password
- As a user I would like to be able to Create a new shopping list
- As a user I would like to be able to add items to my shopping list with a single 'add' button that does not refresh the app
- As a user I would like to be able to delete an item by clicking a button attached to each item
- As a user I would like to be able to be able to edit my items in my list
- As a user, it would be nice if the text itself was editable and did not require a form
- As a user, I would like if I could specify a quantity for the items in my list

## STRETCH GOALS

- As a user, I would like to be able to have multiple lists for different reasons
- As a user, I would like these lists to be accessible from the nav pane in either a tabbed view or a dropdown list
- As a user, I would like if I could share my list with another user so that either user would then have full access to the list.
- As a user, it would be nice if I could keep track of the estimated cost of items in an item-based list
- As a user, I would like to be able to mark an item as completed in a task-based list
- As a user, ideally I would like my list to update when another user cruds the list without me having to worry about it on my end. 'sync'

### Technologies Used

- HTML
- CSS
- SASS
- Handlebars
- Bootstrap
- Javascript
- Ruby on Rails API
- Node
- jQuery
- AJAX
- getFormFields (provided by General Assembly)

### Unsolved Problems

I would really like to stretch my goals well beyond their current state. I would like much more rigorous validation and specific error notifications that tell you what is wrong. End goal would be multiple users sharing a list with full access.

### Wireframes

![Wireframes](https://i.imgur.com/LsUcaYV.jpg)
![wireframe](https://i.imgur.com/sxDJehm.jpg)![wireframe](https://i.imgur.com/ze65jq2.jpg)
