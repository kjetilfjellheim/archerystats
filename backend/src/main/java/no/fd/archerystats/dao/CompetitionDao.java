
package no.fd.archerystats.dao;

import java.util.Date;
import java.util.List;
import no.fd.archerystats.service.pojo.Competition;

/**
 *
 * @author Kjetil
 */
public interface CompetitionDao {

    List<Competition> findResults(String idParam, String idUser, Date fromDate, Date toDate, boolean training);
    
}
