
package no.fd.archerystats.dao;

import java.util.List;
import no.fd.archerystats.service.pojo.Bow;

/**
 *
 * @author Kjetil
 */
public interface BowDao {

    List<Bow> findByUser(String idUser);
    
    Bow findByUserAndBowname(String idUser, String bowname);
    
}
