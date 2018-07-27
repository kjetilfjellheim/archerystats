
package no.fd.archerystats.dao;

import java.util.Date;
import java.util.List;
import no.fd.archerystats.service.pojo.Round;

/**
 *
 * @author Kjetil
 */
public interface RoundDao {

    List<Round> findRounds(String userid, Date fromDate, Date toDate, Integer mindistance, Integer maxdistance);
 
    String insert(String idUser, String idBow, Date shootDate, Integer round, Boolean missScored, Boolean perfectScored, Boolean badshotScored, Integer miss, Integer perfect, Integer badShots, Integer distance, Integer horizontalLeft, Integer horizontalCenter, Integer horizontalRight, Integer verticalHigh, Integer verticalCenter, Integer verticalLow);

    void delete(String idUser, String idBow, Date shootDate);
    
}
