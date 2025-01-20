const yaml = require('js-yaml');
const { getRaspberrys } = require('./registers'); // Import de ton service existant pour récupérer les Raspberrys

const generateTraefikConfig = async (req, res) => {
  try {
    // Récupérer les Raspberrys depuis la base de données
    const raspberrys = await getRaspberrys();

    if (!raspberrys || raspberrys.length === 0) {
      return res.status(404).json({ success: false, message: 'No Raspberrys found in the database.' });
    }

    // Construction de la configuration Traefik
    const config = { http: { routers: {}, services: {} } };

    raspberrys.forEach((raspberry, idx) => {
      const routerName = `router-${idx}`;
      const serviceName = `service-${idx}`;
      const host = `${raspberry.name}.g2.south-squad.io`;
      const port = raspberry.port;

      config.http.routers[routerName] = {
        rule: `Host(\`${host}\`)`,
        service: serviceName,
        entryPoints: ['web'],
      };

      config.http.services[serviceName] = {
        loadBalancer: {
          servers: [{ url: `http://${host}:${port}` }],
        },
      };
    });

    // Conversion en YAML et renvoi de la configuration
    const yamlConfig = yaml.dump(config);
    res.setHeader('Content-Type', 'application/x-yaml');
    res.send(yamlConfig);
  } catch (error) {
    console.error('Error generating Traefik config:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
};

module.exports = { generateTraefikConfig };
