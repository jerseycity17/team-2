<html>
<body>

Welcome, your family is <?php echo $_POST["name"]; ?><br>
Your email address is: <?php echo $_POST["email"]; ?><br>
Your phone number is: <?php echo $_POST["number"]; ?><br>
Your address is: <?php echo $_POST["address"]; ?><br>
Your employment status is: <?php echo $_POST["email"]; ?><br>
Your email address is: <?php echo $_POST["email"]; ?><br>
if(isset($_POST['submit'])){
$selected_val = $_POST['status'];  // Storing Selected Value In 
echo "You have selected :" .$selected_val; <br>
if(isset($_POST['radio'])){
echo "You have selected :".$_POST['radio'];  //  Displaying Selected 
}<br>
Your Family Emergency Contact 1 is: <?php echo $_POST["family1"]; ?><br>

Your Family Emergency Contact 1 's number is: <?php echo $_POST["family1number"]; ?><br>
Your Family Emergency Contact 2 is: <?php echo $_POST["family2"]; ?><br>
Your Family Emergency Contact 2's number is: <?php echo $_POST["family2number"]; ?><br>

Healthy? :<?php echo $_POST["health"]; ?><br>

if(isset($_POST['phonechecked']) &&


   $_POST['phonechecked'] == 'Yes')
{

    echo "I accept contact by phone.";

}
else if{ 
if(isset($_POST['emailcheck']) &&


   $_POST['emailcheck'] == 'Yes')
{

    echo "I accept contact by email.";
}
else if{ 
if(isset($_POST['socialcheck']) &&


   $_POST['socialcheck'] == 'Yes')
{

    echo "I accept contact by social media.";
}

else{ echo "Please don't contact me.";

}   

Additional info you need to know about me <?php echo $_POST["additionalinfo"]; ?><br>

</body>
</html>