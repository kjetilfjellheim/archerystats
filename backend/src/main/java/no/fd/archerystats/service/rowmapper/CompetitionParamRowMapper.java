
package no.fd.archerystats.service.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import no.fd.archerystats.service.pojo.CompetitionParam;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

/**
 *
 * @author Kjetil
 */
@Component
public class CompetitionParamRowMapper implements RowMapper<CompetitionParam> {

    public CompetitionParam mapRow(ResultSet rs, int i) throws SQLException {
        CompetitionParam competitionParam = new CompetitionParam();
        competitionParam.setId(rs.getString("id"));
        competitionParam.setDistance(rs.getString("distance"));
        competitionParam.setParam(rs.getString("parameter"));
        return competitionParam;
    }
    
}
