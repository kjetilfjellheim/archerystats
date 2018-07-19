package no.fd.archerystats.service;

import java.util.Date;
import java.util.List;
import no.fd.archerystats.service.pojo.Competition;
import no.fd.archerystats.service.pojo.CompetitionParam;

/**
 *
 * @author kjetilf
 */
public interface CompetitionService {
    
    List<Competition> getTrainingResults(String idUser, String idParam, Date fromDate, Date toDate);
    
    List<Competition> getCompetitionResults(String idUser, String idParam, Date fromDate, Date toDate);
 
    List<CompetitionParam> getCompetitionParams();
    
    
}
