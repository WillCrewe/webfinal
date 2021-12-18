Final Project 
CPSCP 458

Website Description:
Authorization page - Users can sign up and login (does not need email verification)
Once on the site, user will input their "Today's Calorie Goal" which is the goal for calories consumed - calories burned (If the user has not already done that today)
The value is added to the database with a date value to check if they have entered today

After that, the user is met with the main page
Main page shows a welcome, with the users email.
Shows their calorie goal for the day.

Shows their total calories consumed for the day with an input field allowing the user to input more entries
Shows their total calories burned for the day with an input field allowing the user to input more entries

Shows their previously entered values for both consumed and burned

Only accepts integer values for the input fields, will do nothing if a non integer was entered. 

Calculates the total calorie difference of calories consumed - calories burned and compares that to the goal

Has a logout button at the bottom.

Only issue I have run into with the website is the time difference between supabase and client time.
So if you are attempting to enter values and you do not see them around 3pm and later, they are being entered for the next day.

I could not figure out how to fix this issue, it is the current only known bug I have with my code. 
