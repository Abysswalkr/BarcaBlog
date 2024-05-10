import React from 'react';
import { useNavigate } from 'react-router-dom';  

const ClubHistory = () => {
  const navigate = useNavigate();  

  return (
    <div className="club-history-container mx-auto px-4 py-8 max-w-screen-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Historia del FC Barcelona</h2>
      <p style={{ textAlign: 'justify' }}>
        El FC Barcelona, más que un club, es una institución que ha dejado una huella indeleble en el fútbol mundial. Fundado en 1899 por Joan Gamper, un empresario suizo apasionado por el fútbol, este club catalán ha evolucionado hasta convertirse en un gigante deportivo, reconocido tanto por su excepcional talento en el campo como por su profundo impacto cultural. Desde sus inicios, el club no solo se centró en ganar partidos, sino también en fomentar el orgullo catalán. Esta visión se materializó rápidamente en éxitos deportivos, con el Barça ganando su primer trofeo, la Copa Macaya, en 1902. Este fue el precursor del Campeonato de Cataluña, que el club dominaría en los años venideros.
      </p>
      <p style={{ textAlign: 'justify' }}>
        La década de 1950 fue testigo de uno de los períodos más exitosos en la historia del club. La temporada 1951-1952 es especialmente memorable, ya que el Barça consiguió un hito impresionante al ganar cinco trofeos en un solo año: la Liga, la Copa del Generalísimo, la Copa Latina, la Copa Eva Duarte y la Copa Martini Rossi. Este período de gloria consolidó al FC Barcelona como un formidable contendiente en el ámbito del fútbol europeo.
      </p>
      <p style={{ textAlign: 'justify' }}>
        A pesar de su éxito, los años 60 trajeron consigo desafíos significativos, con una visible disminución en el rendimiento del equipo. Sin embargo, la década de 1970 marcó un renacimiento, impulsado en gran parte por la llegada de Johan Cruyff, tanto como jugador en 1973 y más tarde como entrenador en 1988. Su filosofía revolucionaria, que más tarde sería conocida como el "fútbol total", transformó la manera de jugar del equipo y sentó las bases para futuros éxitos.
      </p>
      <p style={{ textAlign: 'justify' }}>
        Uno de los capítulos más brillantes en la historia del club comenzó en 2008, cuando Pep Guardiola asumió como entrenador del primer equipo. Bajo su liderazgo, el Barça adoptó el estilo de juego del tiki-taka, caracterizado por el pase corto y la posesión del balón. Este enfoque llevó al equipo a alcanzar la cima del fútbol mundial, obteniendo múltiples títulos de La Liga, la Copa del Rey, y dos títulos de la Liga de Campeones de la UEFA en 2009 y 2011.
      </p>
      <p style={{ textAlign: 'justify' }}>
        La última década ha sido un período de transición y desafíos para el FC Barcelona. La era posterior a Guardiola ha visto la partida de figuras legendarias como Xavi Hernández y Andrés Iniesta, y más recientemente, la salida de Lionel Messi en 2021. A pesar de estas pérdidas, el club sigue buscando formas de volver a su antigua gloria, adaptándose a nuevas estrategias y enfrentando los retos económicos y competitivos del fútbol moderno.
      </p>
      <p style={{ textAlign: 'justify' }}>
        A través de sus altibajos, el FC Barcelona ha mantenido su estatus como uno de los clubes más influyentes y respetados en el mundo del fútbol. Con un legado que trasciende el deporte, el Barça sigue siendo un símbolo de excelencia y un embajador de la cultura catalana a nivel global. Este resumen ofrece una visión integral de los momentos más significativos en la rica historia del FC Barcelona, destacando cómo cada era ha contribuido a moldear el legado del club en el escenario mundial.
      </p>
         <button
        onClick={() => navigate('/')}  // Navega hacia HomePage
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Regresar al Inicio
      </button>
    </div>
  );
};

export default ClubHistory;

