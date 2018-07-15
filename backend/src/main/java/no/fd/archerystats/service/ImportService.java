
package no.fd.archerystats.service;

import java.util.List;
import no.fd.archerystats.service.pojo.Round;

/**
 *
 * @author Kjetil
 */
public interface ImportService {

    void importData(List<Round> rounds);
    
}
