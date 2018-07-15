package no.fd.archerystats.init;

import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.joran.JoranConfigurator;
import ch.qos.logback.core.joran.spi.JoranException;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.EnumSet;
import java.util.logging.Level;

import javax.servlet.DispatcherType;
import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.support.AbstractDispatcherServletInitializer;

/**
 *
 * @author Kjetil Fjellheim
 */
public class WebAppInitalizer extends AbstractDispatcherServletInitializer {

    private static final Logger LOGGER = LoggerFactory.getLogger(WebAppInitalizer.class);

    @Override
    protected WebApplicationContext createServletApplicationContext() {
        AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
        return ctx;
    }

    @Override
    protected String[] getServletMappings() {
        return new String[]{"/*"};
    }

    @Override
    protected WebApplicationContext createRootApplicationContext() {
        LOGGER.info("createRootApplicationContext");
        AnnotationConfigWebApplicationContext ctx = new AnnotationConfigWebApplicationContext();
        ctx.scan("no.fd.archerystats");
        LOGGER.info("createRootApplicationContext finished");
        return ctx;
    }

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        InputStream configStream = null;
        try {
            LOGGER.info("On startup");
            LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();
            loggerContext.reset();
            JoranConfigurator configurator = new JoranConfigurator();
            configStream = FileUtils.openInputStream(new File( System.getProperty("catalina.base") + "/appconf/archerystats_logback.xml"));
            configurator.setContext(loggerContext);
            configurator.doConfigure(configStream);
            configStream.close();
            super.onStartup(servletContext);
            FilterRegistration.Dynamic encodingFilter = servletContext.addFilter("encodingFilter", org.springframework.web.filter.CharacterEncodingFilter.class);
            encodingFilter.setInitParameter("encoding", "UTF-8");
            encodingFilter.setInitParameter("forceEncoding", "true");
            encodingFilter.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), false, "/*");
            LOGGER.info("Entering application.");
        } catch (IOException ex) {
            java.util.logging.Logger.getLogger(WebAppInitalizer.class.getName()).log(Level.SEVERE, null, ex);
        } catch (JoranException ex) {
            java.util.logging.Logger.getLogger(WebAppInitalizer.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                if (configStream != null) {
                    configStream.close();
                }
            } catch (IOException ex) {
                java.util.logging.Logger.getLogger(WebAppInitalizer.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

}
