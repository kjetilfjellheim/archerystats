
package no.fd.archerystats.dao;

import java.util.List;
import no.fd.archerystats.service.pojo.CompetitionParam;

/**
 *
 * @author Kjetil
 */
public interface CompetitionParamDao {
    
    List<CompetitionParam> findAll();
}
