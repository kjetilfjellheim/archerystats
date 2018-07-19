
package no.fd.archerystats.service.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import no.fd.archerystats.service.pojo.Competition;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

/**
 *
 * @author Kjetil
 */
@Component
public class CompetitionRowMapper implements RowMapper<Competition> {

    public Competition mapRow(ResultSet rs, int i) throws SQLException {
        Competition competition = new Competition();
        competition.setId(rs.getString("id"));
        competition.setIdParam(rs.getString("id_param"));
        competition.setIdUser(rs.getString("id_user"));
        competition.setTraining(rs.getBoolean("training"));
        competition.setDate(rs.getDate("date"));
        competition.setValue(rs.getDouble("value"));
        return competition;
    }
    
}
