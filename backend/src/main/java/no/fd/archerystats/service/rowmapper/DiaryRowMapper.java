
package no.fd.archerystats.service.rowmapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import no.fd.archerystats.service.pojo.Diary;
import no.fd.archerystats.service.pojo.Round;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

/**
 *
 * @author Kjetil
 */
@Component
public class DiaryRowMapper implements RowMapper<Diary>{

    public Diary mapRow(ResultSet rs, int i) throws SQLException {
        Diary diary = new Diary();
        diary.setId(rs.getString("id"));
        diary.setIdUser(rs.getString("id_user"));
        diary.setDate(rs.getDate("date"));
        diary.setComment(rs.getString("comment"));
        diary.setSpt(rs.getInt("spt"));        
        diary.setMinutes(rs.getInt("minutes"));        
        return diary;
    }
    
}
