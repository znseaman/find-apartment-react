# find-apartment-react

A React & Express application where you can browse currently available apartment listings in Vancouver based on your user search preferences. The application runs cron jobs

# Motivation

When looking for apartments, especially in a tight housing market like Vanocuver, you need to be prepared to move quickly. Getting the most up-to-date listings and being able to make a decision on if it meets your criteria is work fit for a computer, not you. This application helped me in my search for a place to rent.

# What I Learned

-   How to add pagination and a photo carousel for listings in `react`
-   How to use and create custom hooks in `react`
-   How to add authentication using session strings
-   How to hash usernames and passwords to be stored in a `postgresql` database
-   How to create cron jobs in `node` that look for new search results for each user and delete existing listings that have been deleted, flagged, or that were posted too long ago
-   How to add listings that fall within set of polygons using `polygon-lookup`
-   How to randomly select a postal code within the city of Vancouver to search for
-   How to create a CRUD API using `express`

# Todos

-   Allow for users to create & modify their own polygon boundaries to return compatible listings based on their neighborhood(s) or zone(s) of preference

-   Allow for users to change their city

-   Allow for updates to be pushed from the server to the client as soon as new listings are found
