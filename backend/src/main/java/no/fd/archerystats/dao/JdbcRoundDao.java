package no.fd.archerystats.dao;

import java.util.Date;
import java.util.List;
import javax.sql.DataSource;
import no.fd.archerystats.service.pojo.Round;
import no.fd.archerystats.service.rowmapper.RoundRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Kjetil
 */
@Repository
public class JdbcRoundDao implements RoundDao {

    @Autowired
    private RoundRowMapper roundRowMapper;

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public JdbcRoundDao(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Round> findRounds(String userId, String bowId, Date fromDate, Date toDate, Integer distance) {
        return this.jdbcTemplate.query("select * from archerystats_v1.round where id_user = ? and id_bow = ? and shootdate > ? and shootdate < ? and distance = ?", new Object[]{userId, bowId, fromDate, toDate, distance}, roundRowMapper);
    }

    public List<Round> findRounds(String userId, String bowId, Integer distance) {
        return this.jdbcTemplate.query("select * from archerystats_v1.round where id_user = ? and id_bow = ? and distance = ?", new Object[]{userId, bowId, distance}, roundRowMapper);
    }

}
