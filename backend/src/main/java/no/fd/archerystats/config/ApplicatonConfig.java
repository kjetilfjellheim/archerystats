package no.fd.archerystats.config;

import no.fd.archerystats.init.WebAppInitalizer;
import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.apache.commons.configuration.reloading.FileChangedReloadingStrategy;
import org.apache.commons.configuration.reloading.ReloadingStrategy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 *
 * @author Kjetil Fjellheim
 */

@Configuration
@EnableScheduling
public class ApplicatonConfig {

    private static final Logger LOGGER = LoggerFactory.getLogger(ApplicatonConfig.class);
    
    
   private static final String CATALINA_BASE = "catalina.base";

    /**
     * Configuration object for communicating with property data.
     *
     * @return Configuration object containg properties.
     * @throws ConfigurationException Error during instansiation.
     */
    @Bean(name = "configuration")
    public PropertiesConfiguration configuration() throws ConfigurationException {
        LOGGER.info("Creating property.");
        PropertiesConfiguration configuration = new PropertiesConfiguration(System.getProperty(CATALINA_BASE) + "/appconf/archerystats.properties");
        ReloadingStrategy reloadingStrategy = new FileChangedReloadingStrategy();
        configuration.setReloadingStrategy(reloadingStrategy);
        LOGGER.info("Finished creating property.");
        return configuration;
    }

}
