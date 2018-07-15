package no.fd.archerystats.service;

import org.apache.commons.configuration.Configuration;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author Kjetil
 */
public abstract class AbstractService {

    @Autowired
    private Configuration configuration;

}
