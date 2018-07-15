
package no.fd.archerystats.service.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import no.fd.archerystats.service.pojo.Bow;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

/**
 *
 * @author Kjetil
 */
@Component
public class BowRowMapper implements RowMapper<Bow>{

    public Bow mapRow(ResultSet rs, int i) throws SQLException {
        Bow bow = new Bow();
        bow.setId(rs.getString("id"));
        bow.setIdUser(rs.getString("id_user"));
        bow.setName(rs.getString("bowname"));
        return bow;
    }
    
}
