$(document).ready(function () {



//funksjon for å validere inputfelter
    function valider(film, antall, fornavn, etternavn, telefonnr, epost) {
        const tlfRegex = /^[0-9]{8}$/;
        const epostRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!film) {
            alert("velg film!");
            return false;
        }
        if (!antall || antall<1 || antall>9) {
            alert("velg antall!");
            return false;
        }
        if (!fornavn) {
            alert("skriv inn fornavn!");
            return false;

        }
        if (!etternavn) {
            alert("skriv inn etternavn!");
            return false;

        }
        if (!telefonnr) {
            alert("skriv inn telefonnummer!");
            return false;

        }
        if (!epost) {
            alert("skriv inn epost!");
            return false;

        }
        if (!tlfRegex.test(telefonnr)) {
            alert("ugyldig telefonnummer!");
            return false;

        }
        if (!epostRegex.test(epost)) {
            alert("ugyldig epost!");
            return false;

        }
        return true;
    }

//funksjon for å lagre billett på server
    function lagreBillett(billett) {
        $.ajax({
            url: "/kjopBillett",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(billett),
            success: function (data) {
                alert("billetten er kjopt");
                visBilletter();
            },
            error: function () {
                alert("kjop mislykket");
            },
        });
    }


//funksjon for å vise billetter fra server-arrayet
    function visBilletter() {
        $.ajax({
            url: "/hentOversikt",
            method: "GET",
            success: function (data) {
                const billettOversikt = $("#billetter");
                billettOversikt.empty(); //tømmer innholdes før oppdatert liste vises

                data.forEach((nyBillett, index) => {
                    billettOversikt.append(`
                <br>
                <h4><strong>Film: </strong>${nyBillett.film}</h4>
                <p><strong>Antall: </strong>${nyBillett.antall}</p>
                <p><strong>Navn: </strong>${nyBillett.fornavn} ${nyBillett.etternavn}</p>
                <p><strong>Tlf: </strong>${nyBillett.telefonnr}</p>
                <p><strong>Epost: </strong>${nyBillett.epost}</p>
                <br>
            `);
                });
            },
            error: function () {
                alert("kunne ikke vise billetter")
            },
        });
    }

//event listener for kjøp billett
    $("#billettform").on("submit", function (event) {
        event.preventDefault(); //hindrer at siden laster på nytt

        //henter inputverdier
        const film = $("#film").val();
        const antall = $("#antall").val();
        const fornavn = $("#fornavn").val();
        const etternavn = $("#etternavn").val();
        const telefonnr = $("#telefonnr").val();
        const epost = $("#epost").val();

        if (!valider(film, antall, fornavn, etternavn, telefonnr, epost)) {
            return; //hvis ugyldig input blir ikke ny billett opprettet
        }
        //lager et billettobjekt
        const nyBillett = {film, antall, fornavn, etternavn, telefonnr, epost};
        lagreBillett(nyBillett);


        //nullstiller inputskjemaet
        this.reset();
    });


//funksjon for å nullstille billettoversikten (snakker med server)
    function nullstill() {
        $.ajax({
            url: "/nullstill",
            method: "DELETE",
            success: function () {
                alert("alle billetter er slettet");
                visBilletter();
            },
            error: function () {
                alert("kunne ikke slette billetter");
            },
        });
    }


    //event listener for å slette alle billetter (når knappen trykkes)
    $("#slettAlle").on("click", function (event) {
        if (confirm("er du sikker på at du vil slette alle billetter?")) {
            nullstill();
        }
        visBilletter();

    });

});