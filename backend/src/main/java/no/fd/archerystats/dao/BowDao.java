
package no.fd.archerystats.dao;

import java.util.List;
import no.fd.archerystats.service.pojo.Bow;

/**
 *
 * @author Kjetil
 */
public interface BowDao {

    public List<Bow> findByUser(String idUser);
    
}
