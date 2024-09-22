let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute;

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a [href*=' + id +']').classList.add("active")
            })
        }
    })
}

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

/*function SendMail(){
    var params = {
        form_name : document.getElementById("fullName").value,
        email_id : document.getElementById("email").value,
        phone_id : document.getElementById("phone").value,
        subject_id : document.getElementById("subject").value,
        message_id : document.getElementById("message").value
    }
    emailjs.send("Your_ServiceID", "TemplateID", params)
    .then(function(response){
        alert("Success! " + response.status);
    })
    .catch(function(error){
        alert("Failed to send email. Error: " +error);
    });
}*/
