$(document).ready(function () {
    ikctv = {
        patient: {
            "nombre":null,
            "birthday":null,
            "age":null
        },
        values: {
            "fr":null,
            "so":null,
            "event_date":null

        },
        scores: {
            "fr":null,
            "so":null,
            "apa":null,
            "brd":null,
            "rxap":null,
            "uma":null,
            "rva":null,
            "mectos":null,
            "pva":null
        }}
    });
    $("#patient_birthday").change(function (){
        now = moment();
        ikctv.values.event_date = now
        patient_birthday = moment($(this).val(), 'YYYY-MM-DD')
        years = Math.round(now.diff(patient_birthday,"years")) // 365.25   
        month = Math.round(now.diff(patient_birthday, "months", true)) //12    
        ikctv.values.age = month
        if (years > 0) {
            a=years*12
            b=month-a
            $("#patient_age_box").show()
            $("#patient_age").val(`${years} año(s) ${b} meses`)
        } else {
            $("#patient_age_box").show()
            $("#patient_age").val(`${years} año(s) ${month} meses`)
        }     
    });
    $('input[name="apa"]').change(function (){
        console.log($(this).val())
        ikctv.scores.apa = parseInt($(this).val())
    });
    $('input[name="brd"]').change(function (){
        console.log($(this).val())
        ikctv.scores.brd = parseInt($(this).val())
    }); 
    $('input[name="rxap"]').change(function (){
        console.log($(this).val())
        ikctv.scores.rxap = parseInt($(this).val())
    });
    $('input[name="uma"]').change(function (){
        console.log($(this).val())
        ikctv.scores.uma = parseInt($(this).val())   
    });            
    $('input[name="rva"]').change(function (){
        console.log($(this).val())
        ikctv.scores.rva = parseInt($(this).val())  
    });
    $('input[name="mectos"]').change(function (){
        console.log($(this).val())
        ikctv.scores.mectos = parseInt($(this).val()) 
    });
    $('input[name="pva"]').change(function (){
        console.log($(this).val())
        ikctv.scores.pva = parseInt($(this).val())                     
    });

    function isBetween(n, a, b) {
        return (n - a) * (n - b) <= 0
    };
    $("#fr").change(function () {
        value = $(this).val()
        if (value < 10) {
            console.log("error")
            $("#fr_score").hide()
            $(this).removeClass("is-valid").addClass("is-invalid")
            ikctv.values.fr = null
            ikctv.scores.fr = null
        } else if (value==30) {
            $("#fr_score").show()
            $(this).removeClass("is-invalid").addClass("is-valid")
            $("#fr_score").text("Puntaje: 0")
            ikctv.values.fr = value
            ikctv.scores.fr = 0
        } else if (isBetween(value,31,45)) {
            $("#fr_score").show()
            $(this).removeClass("is-invalid").addClass("is-valid")
            $("#fr_score").text("Puntaje: 1")
            ikctv.values.fr = value
            ikctv.scores.fr = 1
        } else if (isBetween(value,46,60)) {
            $("#fr_score").show()
            $(this).removeClass("is-invalid").addClass("is-valid")
            $("#fr_score").text("Puntaje: 2")
            ikctv.values.fr = value
            ikctv.scores.fr = 2
        } else if (value > 60 & value <= 120) {   //Consultar a Luz Máximo FR en pacientes
            $("#fr_score").show()
            $(this).removeClass("is-invalid").addClass("is-valid")
            $("#fr_score").text("Puntaje: 3")
            ikctv.values.fr = value
            ikctv.scores.fr = 3
        } else {
            $(this).removeClass("is-valid").addClass("is-invalid")
            $("#fr_score").hide()
            ikctv.values.fr = null
            ikctv.scores.fr = null
        }
    });
    $("#so").change(function () {
        value = $(this).val()
        if (value > 100) {
            console.log("error")
            $("#so_score").hide()
            $(this).removeClass("is-valid").addClass("is-invalid")
            ikctv.values.so = null
            ikctv.scores.so = null
        } else if (isBetween(value,98,100)) {
            $("#so_score").show()
            $(this).removeClass("is-invalid").addClass("is-valid")
            $("#so_score").text("Puntaje: 0")
            ikctv.values.so = value
            ikctv.scores.so = 0
        } else if (isBetween(value,95,97)) {
            $("#so_score").show()
            $(this).removeClass("is-invalid").addClass("is-valid")
            $("#so_score").text("Puntaje: 1")
            ikctv.values.so = value
            ikctv.scores.so = 1
        } else if (isBetween(value,92,94)) {
            $("#so_score").show()
            $(this).removeClass("is-invalid").addClass("is-valid")
            $("#so_score").text("Puntaje: 2")
        } else if (value > 0 & value <= 91) {
            $("#so_score").show()
            $(this).removeClass("is-invalid").addClass("is-valid")
            $("#so_score").text("Puntaje: 3")
            ikctv.values.so = value
            ikctv.scores.so = 3
        } else {
            $(this).removeClass("is-valid").addClass("is-invalid")
            $("#so_score").hide()
            ikctv.values.so = null
            ikctv.scores.so = null
        }
    });


    function sum(ft, e, wh) {
        return ft + e + wh
    };
    function partial_total(p, s, a) {
        return p * s * a
    };
    function validate(id, v, m) {
        if (isBetween(v, 0, m)) {
            $(id).removeClass("is-invalid").addClass("is-valid")
            valid_form = true
        } else if ($(id).val() == "") {
            $(id).removeClass("is-invalid").removeClass("is-valid")
            valid_form = false
        } else {
            $(id).removeClass("is-valid").addClass("is-invalid")
            valid_form = false
        }
        return valid_form
    };
    function items(obj) {
        var i, arr = [];
        for (i in obj) {
            arr.push(obj[i]);
        }
        return arr;
    };
    function calculate(part) {
        p = ($("#" + part + "-percentage").text())
        fissured_tongue = parseInt($("#" + part + "-fissured_tongue").val())
        fissured_tongue_valid = validate("#" + part + "-fissured_tongue", fissured_tongue, 1)

        erythema = parseInt($("#" + part + "-erythema").val())
        erythema_valid = validate("#" + part + "-erythema", erythema, 4)

        area_score = parseInt($("#" + part + "-area_score").val())
        area_score_valid = validate("#" + part + "-area_score", area_score, 6)

        white_halo = parseInt($("#" + part + "-white_halo").val())
        white_halo_valid = validate("#" + part + "-white_halo", white_halo, 4)

        if (fissured_tongue_valid & erythema_valid & white_halo_valid) {
            part_sum = sum(
                fissured_tongue,
                erythema,
                white_halo,
            )
            $("#" + part + "-sum").text(part_sum)
        } else {
            $("#" + part + "-sum").text("")
        }

        if (fissured_tongue_valid & erythema_valid & white_halo_valid & area_score_valid) {
            part_partial_total = partial_total(
                p,
                part_sum,
                area_score
            )
            $("#" + part + "-partial_total").text(Math.round(part_partial_total * 1000) / 1000)
            total_values[part] = part_partial_total
        } else {
            $("#" + part + "-partial_total").text("")
            total_values[part] = NaN
        }
    };
    total_values = {
        apex: NaN,
        borders: NaN,
        lingual_belly: NaN,
        dorsum: NaN
    };
    $("input").change(function () {
        calculate("apex")
        calculate("borders")
        calculate("lingual_belly")
        calculate("dorsum")
        total = items(total_values).reduce((a, b) => a + b, 0)
        if (total) {
            $("#result").show()
            $("#total").text(Math.round(total * 1000) / 1000)
            if (total >= 12) {
                $("#score").text("Severe")
            } else if (total >= 7) {
                $("#score").text("Moderate")
            } else {
                $("#score").text("Mild")
            }
        } else {
            $("#result").hide()
        }
    },
    $('input[name=apa]').click(function(){
        console.log('Hey you clicked this: ' + this.value);
          
        if(this.value == 'apa_0'){
          rate_value = $('0').value;
        } else if(this.value =='apa_1'){
         rate_value = $('1').value;
        } else if(this.value =='apa_2'){
         rate_value = $('2').value;
        }  
      
        $('#results').innerHTML = rate_value;
    }),

    $("input[type=file]").on("change", function () {
        $("[for=file]").html(this.files[0].name);
        $("#preview").attr("src", URL.createObjectURL(this.files[0]))
    }))

    function calcularscore(){
		//debugger;
		var suma = 0;
		for (let [key, value] of Object.entries(ikctv.scores)){
			//console.log(key, value);
			suma = suma + value;
			console.log(suma);
			$("#suma").text(suma)
		}
	}