const $ = document;

$.addEventListener("DOMContentLoaded", () => {
    console.log("Page chargé");
    const button = $.getElementById("submit");
    const span = $.querySelector("span");
    const coloration_button = () => {
        if (button.disabled === true) {
            button.style.background = "var(--light-violet)";
        } else {
            button.style.background = " var(--violet)";
        }
    };
    $.querySelector("#contactForm").addEventListener(
        "submit",
        async (event) => {
            //annuler le refresh de la page
            event.preventDefault();
            button.disabled = true;
            // button.classList.add("btn-disabled");
            coloration_button();
            const data = {
                firstname: $.querySelector("#firstname").value,
                lastname: $.querySelector("#lastname").value,
                email: $.querySelector("#email").value,
                subject: $.querySelector("#subject").value,
                message: $.querySelector("#message").value,
            };
            console.log(data);
            const response = await axios.post(
                "https://formulaire-backend-api.herokuapp.com/",
                data
            );
            console.log(response);
            if (response.status === 200) {
                // alert("Formulaire soumis, email envoyé");
                // button.classList.remove("btn-disabled");
                button.disabled = false;
                coloration_button();
                span.classList.remove("hidden");
                // span.classList.remove("hidden");
                let counter = 0;
                const removeMessage = () => {
                    span.classList.add("hidden");
                };
                if (counter === 1) {
                    clearInterval(repeat);
                } else {
                    counter++;
                }
                let repeat = setInterval(() => {
                    removeMessage();
                }, 2000);
                $.getElementById("contactForm").reset();
            } else {
                alert("Le formulaire n'a pas été envoyé!");
                // button.classList.remove("btn-disabled");
                button.disabled = false;
                coloration_button();
            }
        }
    );
});
