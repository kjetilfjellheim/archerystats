package no.fd.archerystats.config;

import javax.sql.DataSource;
import org.apache.commons.dbcp2.BasicDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

/**
 *
 * @author Kjetil
 */
@Configuration
@EnableTransactionManagement
public class DBconfig {

    private static final Logger LOGGER = LoggerFactory.getLogger(DBconfig.class);    
    
    @Autowired
    private org.apache.commons.configuration.Configuration configuration;

    @Bean
    public DataSource dataSource() {
        LOGGER.info("Creating datasource.");
        BasicDataSource dataSource = new BasicDataSource(); 
        dataSource.setDriverClassName(configuration.getString("jdbc.driver"));
        dataSource.setUrl(configuration.getString("jdbc.url"));
        dataSource.setUsername(configuration.getString("jdbc.username"));
        dataSource.setPassword(configuration.getString("jdbc.password"));
        dataSource.setTestWhileIdle(configuration.getBoolean("jdbc.testWhileIdle"));
        dataSource.setMaxTotal(configuration.getInt("jdbc.maxTotal"));
        LOGGER.info("Finished creating datasource.");
        return dataSource;
    }   

    @Bean
    public PlatformTransactionManager transactionManager() {
        return new DataSourceTransactionManager(dataSource());
    }
    
}
