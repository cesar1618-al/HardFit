const rutinaSelect = document.getElementById("rutina-Select");
    const rutinaResult = document.getElementById("rutina-Result");

    rutinaSelect.addEventListener("change", () => {
      const valor = rutinaSelect.value;
      let contenido = "";

      if (valor === "ganar") {
        contenido = `
          <h3>Rutina para Ganar Masa Muscular </h3>
          <ul>
            <li>Pecho y tríceps: Press banca, fondos, extensiones</li>
            <li>Espalda y bíceps: Dominadas, remo con barra, curls</li>
            <li>Piernas: Sentadillas, prensa, peso muerto</li>
            <li>Cardio: 20 min suaves 3x por semana</li>
          </ul>
        `;
      } else if (valor === "perder") {
        contenido = `
          <h3>Rutina para Perder Grasa </h3>
          <ul>
            <li>Full body 4x por semana con pesas ligeras</li>
            <li>HIIT 20 minutos diarios</li>
            <li>Cardio: Caminata o bicicleta 45 min</li>
            <li>Dieta baja en carbohidratos</li>
          </ul>
        `;
      } else if (valor === "resistencia") {
        contenido = `
          <h3>Rutina para Aumentar Resistencia </h3>
          <ul>
            <li>Circuitos combinados 5x por semana</li>
            <li>Ejercicios funcionales: burpees, saltos, planchas</li>
            <li>Correr 5–10 km semanales</li>
          </ul>
        `;
      } else {
        contenido = "<p>Selecciona un objetivo para ver tu rutina.</p>";
      }

      rutinaResult.innerHTML = contenido;
    });


    function red(n) {
      return Math.round(n * 100) / 100;
    }

    document.getElementById("calcForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const sexo = document.getElementById("sexo").value;
      const edad = parseFloat(document.getElementById("edad").value);
      const peso = parseFloat(document.getElementById("peso").value);
      const altura = parseFloat(document.getElementById("altura").value);
      const actividad = parseFloat(document.getElementById("actividad").value);
      const objetivo = document.getElementById("objetivo").value;

      if (!sexo || !edad || !peso || !altura || !actividad || !objetivo) {
        alert("Por favor completa todos los campos.");
        return;
      }


      let bmr = sexo === "hombre" ? 10 * peso + 6.25 * altura - 5 * edad + 5 :
                                       10 * peso + 6.25 * altura - 5 * edad - 161;
      let tdee = bmr * actividad;

      let caloriasObjetivo = objetivo === "bajar" ? tdee * 0.8 :
                             objetivo === "subir" ? tdee * 1.15 : tdee;

      let gProteina = objetivo === "subir" ? peso * 1.8 : peso * 1.6;
      let kcalProteina = gProteina * 4;
      let kcalGrasa = caloriasObjetivo * 0.25;
      let gGrasa = kcalGrasa / 9;
      let kcalCarb = caloriasObjetivo - (kcalProteina + kcalGrasa);
      let gCarb = kcalCarb / 4;

      document.getElementById("kcal").textContent = red(caloriasObjetivo) + " kcal/día (aprox.)";
      document.getElementById("prot").textContent = red(gProteina) + " g de proteína al día";
      document.getElementById("gras").textContent = red(gGrasa) + " g de grasa al día";
      document.getElementById("carb").textContent = red(gCarb) + " g de carbohidratos al día";


      const alturaM = altura / 100;
      const imc = peso / (alturaM * alturaM);

      let categoriaIMC = "", colorIMC = "", porcentajeIMC = 0;
      if (imc < 18.5) { categoriaIMC="Bajo peso"; colorIMC="blue"; porcentajeIMC=18.5/40*100; }
      else if (imc<25) { categoriaIMC="Normal"; colorIMC="green"; porcentajeIMC=22/40*100; }
      else if (imc<30) { categoriaIMC="Sobrepeso"; colorIMC="orange"; porcentajeIMC=27/40*100; }
      else { categoriaIMC="Obesidad"; colorIMC="red"; porcentajeIMC=Math.min((imc/40*100),100); }

      document.getElementById("imc").textContent = `${red(imc)} (${categoriaIMC})`;
      const imcBar = document.getElementById("imcBar");
      imcBar.style.width = porcentajeIMC + "%";
      imcBar.style.backgroundColor = colorIMC;

      document.getElementById("results").style.display = "block";
    });
  