
package no.fd.archerystats.dao;

import java.util.Date;
import java.util.List;
import no.fd.archerystats.service.pojo.Round;

/**
 *
 * @author Kjetil
 */
public interface RoundDao {

    public List<Round> findRounds(String userId, String bowId, Date fromDate, Date toDate, Integer distance);

    public List<Round> findRounds(String userId, String bowId, Integer distance);
    
}
